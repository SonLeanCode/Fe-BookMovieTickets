function TodayDate() {
  const today = new Date();
  const todayDateString = today.toDateString();
  const dates = [
    { date: new Date(today.getTime() + 86400000 * 0), dayIndex: 0 },
    { date: new Date(today.getTime() + 86400000 * 1), dayIndex: 1 },
    { date: new Date(today.getTime() + 86400000 * 2), dayIndex: 2 },
    { date: new Date(today.getTime() + 86400000 * 3), dayIndex: 3 },
    { date: new Date(today.getTime() + 86400000 * 4), dayIndex: 4 },
    { date: new Date(today.getTime() + 86400000 * 5), dayIndex: 5 },
    { date: new Date(today.getTime() + 86400000 * 6), dayIndex: 6 },
  ];

  const getDayOfWeek = (dayIndex) => {
    const daysOfWeek = [
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
      "Chủ nhật",
    ];
    return daysOfWeek[dayIndex];
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <div>
      <div className="flex">
        {dates.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointe2 mx-2 mt-3 rounded-md border-2 px-7 py-1.5 text-[15px] text-white hover:bg-green-600 ${
              item.date.toDateString() === todayDateString ? "bg-green-500" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <p className="mt-1">{getDayOfWeek(item.dayIndex)} </p>
              <span className="text-gray-00 pl-1">{formatDate(item.date)}</span>
            </div>
          </div>
          //
        ))}
      </div>
      {/* dia chi */}
      <div className="diaChi mt-5 flex h-10 w-full">
        <select className="border-1 mr-4 w-1/2 rounded-md border-gray-500">
          <option value="option1">TP.Hồ Chí Minh</option>
          <option value="option3">Quận 1</option>
          <option value="option4">Quận 2</option>
        </select>
        <select className="border-1 w-1/2 rounded-md border-gray-500">
          <option value="option1">Đồng Nai</option>
          <option value="option3">Long Khánh</option>
          <option value="option4">Biên Hòa</option>
        </select>
      </div>
      {/* gach chan  */}
      <p className="relative mt-4 inline-block w-full">
        <span className="before:absolute before:inset-0 before:-translate-y-1/2 before:transform before:border-b-2 before:border-purple-200 before:content-['']"></span>
      </p>
      {/* diachi */}
      <div className="mt-10 pl-5 text-white">
        <h2>GALAXY Long Khánh</h2>
        <p className="mt-6 flex gap-40">
          <span className="mt-2 text-gray-400">2D</span>
          <span className="inline-block rounded-md border-2 border-gray-300 px-8 py-2 hover:border-green-500">
            19:15
          </span>
        </p>
      </div>
      {/*  */}
      {/* diachi */}
      <div className="mt-16 border-y-2 border-gray-700 bg-[#222121] py-14 pl-5 text-white">
        <h2 className="">GALAXY Quận 1</h2>
        <p className="mt-6 flex gap-16">
          <span className="mt-2 text-gray-400">Samsung Neo QLED</span>
          <span className="ml-2 inline-block rounded-md border-2 border-gray-300 px-8 py-2 hover:border-green-500">
            21:15
          </span>
        </p>
      </div>
      {/*  */}
      <div className="mt-10 pl-5 text-white">
        <h2>GALAXY Biên Hòa</h2>
        <p className="mt-6 flex gap-40">
          <span className="mt-2 text-gray-400">2D </span>
          <span className="inline-block rounded-md border-2 border-gray-300 px-8 py-2 hover:border-green-500">
            20:00
          </span>
        </p>
      </div>
    </div>
  );
}

export default TodayDate;
