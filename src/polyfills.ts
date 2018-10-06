Object.defineProperty(Array.prototype, 'equal', {
  value: function (array: any[]) {
    return array instanceof Array && JSON.stringify(this.sort()) === JSON.stringify(array.sort())
  }
})
