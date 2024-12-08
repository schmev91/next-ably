"use client";

import { Realtime } from "ably";
import { useEffect, useState } from "react";

const Test = () => {
  const realtime = new Realtime({
    key: process.env.ABLY_KEY,
    token:
      "5Qk1BA.DJrXWM8maItgP-ro0g2v_4EwF7BxD8yk0jcP8o-Bz3tXjlVsEoV9pRilUwlvlXXhtfQ2YBb9fM65ZNd9VqkGt8OWiMZ3-1e0Lim78shHghVUVUbsDwfh3CO3jbjP4FiMm",
  });

  const channel = realtime.channels.get("public:notification");

  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    channel.subscribe("new-notification", (msg) => {
      // console.log("Message received: ", msg);
      setNotifications([...notifications, msg.data.message]);
      console.log("Số lượng thông báo: ", notifications.length);
      console.log([...notifications, msg.data]);
    });
  });

  return (
    <div className="flex flex-col gap-3 w-96 font-bold">
      {!notifications.length ? (
        <h1 className="text-3xl">Hiện chưa có thông báo</h1>
      ) : (
        notifications.map((msg, index) => (
          <div key={index} className="border-white px-3 py-2 border rounded-md">
            {msg}
          </div>
        ))
      )}
    </div>
  );
};

export default Test;
