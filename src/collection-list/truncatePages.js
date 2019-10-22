function truncatePages(pages, currentPage) {
  if (pages.length < 5) {
    return pages
  }

  const currentPageIndex = currentPage - 1
  const lastPage = pages[pages.length - 1]
  const blockPivot = 3
  const startOfCurrentBlock = Math.abs(currentPage - blockPivot)
  const startOfLastBlock = lastPage.label - 4
  const blockStartIndex = Math.min(
    startOfCurrentBlock,
    startOfLastBlock,
    currentPageIndex
  )

  const truncatedPages = pages.slice(blockStartIndex, blockStartIndex + 4)
  const firstOfTruncatedPagesNum = truncatedPages[0].label
  const lastOfTruncatedPagesNum =
    truncatedPages[truncatedPages.length - 1].label

  if (firstOfTruncatedPagesNum > 3) {
    truncatedPages.unshift({ label: '...' })
  }
  if (firstOfTruncatedPagesNum > 1) {
    truncatedPages.unshift(pages[0])
  }
  if (lastOfTruncatedPagesNum < lastPage.label - 2) {
    truncatedPages.push({ label: '...' })
  }
  if (lastOfTruncatedPagesNum < lastPage.label) {
    truncatedPages.push(lastPage)
  }

  return truncatedPages
}

export default truncatePages
