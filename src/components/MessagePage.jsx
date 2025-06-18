import React from "react";

const MessagePage = () => {
  return (
    <div className="">
      <h1>Message</h1>
      <form className="flex flex-col w-fit gap-6 border-2 border-gray-300 rounded-md p-4" action="">
        <textarea
          className="px-4 py-2 border border-gray-300 rounded-md h-32 w-72 bg-gray-100"
          placeholder="type message here"
        />
        <div className="flex justify-between">
          <label htmlFor="expiry">Expiry:</label>
          <input className="border border-gray-300 rounded-md p-2" name="expiry" type="datetime-local" placeholder="fa" />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 m-auto">
          SEND
        </button>
      </form>
      <div className="p-0.5 bg-gray-300 my-6 border border-gray-300"></div>
      <h1>History</h1>
    </div>
  );
};

export default MessagePage;
