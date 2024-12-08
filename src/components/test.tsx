"use client";

import { Realtime } from "ably";
import { useEffect, useState } from "react";

const Test = () => {
  const realtime = new Realtime({
    token:
      "5Qk1BA.DCCkX93OuT4LM6uzeEpPS81IpLR3oLcocuN5D_Sp8IQ8FiDSaNLP2CPbjOs39ewp1MXPhVZILRmx0LDs1SKKfNg7I31d5qvewhUh56cE6G9Ki1eOIr-7_eeS4uosQ6QjJ",
  });

  const channel = realtime.channels.get("notification");

  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    channel.subscribe("inw", (msg) => {
      // console.log("Message received: ", msg);
      setNotifications([...notifications, msg.data]);
      console.log("Số lượng thông báo: ", notifications.length);
      console.log([...notifications, msg.data]);
    });
  });

  return (
    <div className="flex flex-col w-96 font-bold">
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
