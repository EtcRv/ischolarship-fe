const FilterComponent = () => {
  return (
    <div className="bg-white h-fit max-w-md flex-col rounded py-4 px-6">
      <span className="text-black text-start text-base">Filter</span>
      <div className="flex-col my-4">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Nationality
        </label>
        <select
          id="countries"
          className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected>Select country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className="flex-col my-4">
        <label
          htmlFor="degree"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          I'm looking for{" "}
        </label>
        <select
          id="degree"
          className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected>Select degree</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
        Search
      </button>
    </div>
  );
};

export default FilterComponent;
