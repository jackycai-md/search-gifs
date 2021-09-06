const MAX_OFFSET = 4999;

export const getTotalPageNumber = (totalCount: number, countPerPage: number) => {
  const maxPageNumber = Math.ceil(MAX_OFFSET/countPerPage);
  
  // The page number should not exceed the one with MAX_OFFSET.
  // Otherwise the Giphy API will only return empty data.
  return Math.min(Math.ceil(totalCount/countPerPage), maxPageNumber);
};

/**
 * Generate clickable page numbers for the pagination bar
 * @param totalPageNum - Total page number
 * @param curPageNum - Current page number
 * @returns The clickable page numbers.
 */
 export const generatePages = (totalPageNum: number, curPageNum: number) => {
  const availablePages: number[] = [];

  if (totalPageNum < 5) {
    for (let i = 1; i <= totalPageNum; i++) {
      availablePages.push(i);
    }

    return availablePages;
  }

  let lowerLimit = curPageNum < 3 ? 1 : curPageNum - 2
  let upperLimit = lowerLimit + 4;

  if (upperLimit > totalPageNum) {
    upperLimit = totalPageNum;

    lowerLimit = upperLimit - 4 > 1 ? upperLimit - 4 : 1;
  }

  for (let i = lowerLimit; i <= upperLimit; i++) {
    availablePages.push(i);
  }

  return availablePages;
};
