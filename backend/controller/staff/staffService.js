const Notification = require("../../models/Notification");

// 📌 Create notification (staff)
exports.createNotification = async (req, res) => {
  try {
    const { title, content, isUrgent, receiver } = req.body;
    const notify = new Notification({
      title,
      content,
      isUrgent,
      receiver: receiver || null,
    });
    await notify.save();
    res.status(201).json(notify);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get notifications (with filter for staff)
exports.getNotifications = async (req, res) => {
  try {
    const { title, receiver, fromDate, toDate } = req.query;
    let query = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (receiver) query.receiver = receiver;
    if (fromDate || toDate) {
      query.createdAt = {};
      if (fromDate) query.createdAt.$gte = new Date(fromDate);
      if (toDate) query.createdAt.$lte = new Date(toDate);
    }

    const notifications = await Notification.find(query).populate(
      "receiver",
      "fullname email"
    );
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Delete notification (staff)
exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Notification deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Mark as urgent (staff)
// ✅ New improved markUrgent backend — toggle urgent state, not just force true
exports.markUrgent = async (req, res) => {
  try {
    const notify = await Notification.findById(req.params.id);
    if (!notify) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Toggle logic
    notify.isUrgent = !notify.isUrgent;
    await notify.save();

    res.json({ message: `Urgent status updated`, notification: notify });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 User: Get notifications (polling)
exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.cc.id;
    const notifications = await Notification.find({
      $or: [{ receiver: null }, { receiver: userId }],
    }).sort({ createdAt: -1 });

    const unreadCount = notifications.filter(
      (n) => !n.isReadBy.includes(userId)
    ).length;

    res.json({ notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 User: Mark as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.cc.id;
    const notify = await Notification.findById(id);

    if (!notify) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (!notify.isReadBy.includes(userId)) {
      notify.isReadBy.push(userId);
      await notify.save();
    }

    res.json({ message: "Marked as read." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
