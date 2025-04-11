import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Read from cloned Gensyn repo
  const dataPath = path.join(process.cwd(), 'paper-rl-swarm/data/swarm_logs.json');
  const rawData = fs.readFileSync(dataPath);
  const swarmData = JSON.parse(rawData);

  // Transform for frontend
  const nodes = swarmData.map(node => ({
    id: node.node_id,
    rewards: node.cumulative_reward,
    exploration: node.exploration_rate,
    collaboration: node.peer_contributions.length / 10 // Normalized
  }));

  res.status(200).json({ nodes });
}