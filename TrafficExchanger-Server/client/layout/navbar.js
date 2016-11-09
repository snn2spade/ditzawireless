Template.navbar.helpers({
  isEqual: (page1,page2) => {
    return page1 == page2
  },
  isContain: (string,substring) => {
    return string.indexOf(substring) != -1
  }
});
