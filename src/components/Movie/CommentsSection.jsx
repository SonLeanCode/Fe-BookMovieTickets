import { useState } from "react";

const CommentsSection = () => {
  const [comments, setComments] = useState([
    {
      user: "Xuân Ca",
      content: "Phim hay quá! Mình rất thích!",
      time: "2 giờ trước",
      avatar:
        "https://i.pinimg.com/564x/ac/9e/3d/ac9e3d7c0f10c0689299701c709c2582.jpg",
    },
    {
      user: "Khúc Thị Hương",
      content: "Nội dung rất thú vị, diễn xuất xuất sắc.",
      time: "1 giờ trước",
      avatar:
        "https://i.pinimg.com/564x/25/0f/58/250f584d1f12e823d2cc9a4f82d22883.jpg",
    },
  ]);
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Bình luận</h2>
      <form>
        <label className="sr-only">Your message</label>
        <div className="flex items-center rounded-lg bg-gray-900 px-3 py-2 dark:bg-slate-950">
          <button
            type="button"
            className="hover:bg-g inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                fill="currentColor"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
              <path
                stroke="currentColor"
                d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
              />
              <path
                stroke="currentColor"
                d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
              />
            </svg>
            <span className="sr-only">Upload image</span>
          </button>
          <button
            type="button"
            className="hover:bg-gray-00 cursor-pointer rounded-lg p-2 text-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z"
              />
            </svg>
            <span className="sr-only">Add emoji</span>
          </button>
          <textarea
            id="chat"
            rows="1"
            className="mx-4 block w-full rounded-lg border border-gray-300 bg-gray-900 p-2.5 text-sm text-white focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            type="submit"
            className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="h-5 w-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span
              onClick={() =>
                setComments((prevComments) => [
                  ...prevComments,
                  {
                    user: "Xuân Ca",
                    content: "Phim hay quá! Mình rất thích!",
                    time: "2 giờ trước",
                    avatar:
                      "https://i.pinimg.com/564x/ac/9e/3d/ac9e3d7c0f10c0689299701c709c2582.jpg",
                  },
                ])
              }
              className="sr-only"
            >
              Send message
            </span>
          </button>
        </div>
      </form>

      <div>
        {comments.map((comment, index) => (
          <div className="mt-5 flex items-start gap-2.5" key={index}>
            <img
              className="h-12 w-14 rounded-full"
              src={comment.avatar}
              alt=""
            />
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm font-semibold text-white dark:text-white">
                  {comment.user}
                </span>
                <span className="text-sm font-normal text-gray-500 dark:text-gray-300">
                  {comment.time}
                </span>
              </div>
              <div className="leading-1.5 flex flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-900 p-4 dark:bg-gray-700">
                <p className="text-sm font-normal text-white dark:text-white">
                  {comment.content}
                </p>
              </div>
            </div>
            <button
              id="dropdownMenuIconButton"
              data-dropdown-toggle="dropdownDots"
              data-dropdown-placement="bottom-start"
              className="inline-flex items-center self-center rounded-lg bg-gray-900 p-2 text-center text-sm font-medium text-gray-900 focus:outline-none dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-600"
              type="button"
            >
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 4 15"
              >
                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
