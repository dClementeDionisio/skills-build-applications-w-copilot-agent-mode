import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Workout from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamAlpha = await Team.create({
      name: 'Team Alpha',
      description: 'A high-energy training squad focused on endurance and speed.',
      members: [],
    });

    const teamCore = await Team.create({
      name: 'Core Crew',
      description: 'Strength, skills, and community for dedicated athletes.',
      members: [],
    });

    const users = await User.create([
      {
        name: 'Amina Patel',
        email: 'amina.patel@example.com',
        role: 'coach',
        team: teamAlpha._id,
      },
      {
        name: 'Jordan Lee',
        email: 'jordan.lee@example.com',
        role: 'member',
        team: teamAlpha._id,
      },
      {
        name: 'Sofia Hernandez',
        email: 'sofia.hernandez@example.com',
        role: 'member',
        team: teamCore._id,
      },
    ]);

    teamAlpha.members = [users[0]._id, users[1]._id];
    teamCore.members = [users[2]._id];
    await teamAlpha.save();
    await teamCore.save();

    const activities = await Activity.create([
      {
        title: 'Morning Run',
        type: 'running',
        durationMinutes: 45,
        distanceKm: 9.2,
        caloriesBurned: 520,
        user: users[1]._id,
        date: new Date('2026-07-01T07:30:00Z'),
      },
      {
        title: 'Strength Circuit',
        type: 'strength',
        durationMinutes: 60,
        caloriesBurned: 610,
        user: users[2]._id,
        date: new Date('2026-07-02T18:00:00Z'),
      },
    ]);

    const leaderboardEntries = await Leaderboard.create([
      {
        user: users[1]._id,
        points: 1340,
        rank: 1,
        team: teamAlpha._id,
      },
      {
        user: users[2]._id,
        points: 1180,
        rank: 2,
        team: teamCore._id,
      },
    ]);

    const workouts = await Workout.create([
      {
        name: 'Endurance Builder',
        goal: 'Improve aerobic capacity and stamina',
        durationMinutes: 55,
        difficulty: 'intermediate',
        exercises: [
          { name: 'Jog', durationMinutes: 20 },
          { name: 'Hill sprints', reps: 8, sets: 2 },
          { name: 'Cooldown stretch', durationMinutes: 10 },
        ],
      },
      {
        name: 'Core Strength',
        goal: 'Build functional core stability',
        durationMinutes: 40,
        difficulty: 'beginner',
        exercises: [
          { name: 'Plank', durationMinutes: 3 },
          { name: 'Russian twists', reps: 20, sets: 3 },
          { name: 'Leg raises', reps: 15, sets: 3 },
        ],
      },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log({
      users: users.length,
      teams: 2,
      activities: activities.length,
      leaderboard: leaderboardEntries.length,
      workouts: workouts.length,
    });

    await mongoose.disconnect();
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
