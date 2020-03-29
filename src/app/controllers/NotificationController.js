import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const { userId } = req;

    const isProvider = await User.findOne({
      where: { provider: true, id: userId },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'Only providers can load notifications.' });
    }

    const notifications = await Notification.find({
      user: userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(400).json({ error: 'Notification does not exists.' });
    }

    return res.json({ notification });
  }
}

export default new NotificationController();
