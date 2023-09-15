const SelectedFilter = (props: any) => {
  const addNewElements = (
    filter: Array<any>,
    element: any,
    setFilter: Function,
  ) => {
    const valueOnClick = JSON.parse(element);
    if (!filter.includes(valueOnClick)) setFilter([...filter, valueOnClick]);
  };
  return (
    <div className="flex my-4 justify-center">
      <select
        className="bg-white-50 border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        onChange={(e) => {
          addNewElements(
            props.currentElements,
            e.target.value,
            props.setElement,
          );
          props.close(false);
        }}
      >
        <option selected>{props.emptyValue}</option>
        {props.allValue.map((value: any, idx: number) => {
          return (
            <option
              value={JSON.stringify({ type: value.type, value: value.value })}
              key={idx}
            >
              {value.type}
            </option>
          );
        })}
      </select>
      <button
        className="flex mx-2 rounded bg-red-400 text-white p-2.5 items-center pointer border-[1px] border-grey-200 hover:bg-red-500"
        onClick={() => props.close(false)}
      >
        Cancel
      </button>
    </div>
  );
};

export default SelectedFilter;
