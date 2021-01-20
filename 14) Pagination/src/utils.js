const paginate = (followers) => {
  // calculations
  const itemsPerPage = 9;
  const noOfPages = Math.ceil(followers.length / itemsPerPage);

  // divide data array into multiple single arrays
  const newFollowers = Array.from({ length: noOfPages }, (_, index) => {
    // get starting point for single arrays
    const start = index * itemsPerPage; // 0*10 ,1*10...
    // slice the data array from starting to end point
    return followers.slice(start, start + itemsPerPage); // (0,10),(10,20)...
  });
  // the above loop runs for the 10 elements(array on their own) of newFollowers array

  return newFollowers;
};

export default paginate;
