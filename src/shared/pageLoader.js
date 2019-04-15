/**
 * Enable Page loader
 * @param {Object} $this object of react component
 * @param {String} id id of current page
 * @returns {void}
 */

export const enablePageLoader = ($this, id) => {
    $this.intervalId = setInterval(() => {
        if ($this.props.pageId === id) {
            $this.timeOutID = setTimeout(() => {
                $this.setState({ showPageLoader: false });
                clearInterval($this.intervalId);
            }, 300);
        }
    }, 100);
}

/**
  * Get current class object.
  * @param $this
  * @returns {void}
  */
export const clearPageLoader = ($this) => {
    clearInterval($this.intervalId);
    clearTimeout($this.timeOutID);
}
