/**
 * Encode all "/" by using $2F instead of %2F
 * Since "/" is a special character in URL, it can not be encoded normally,
 * @export
 * @param {string} str
 * @returns {string}
 */
const encodeForwardSlash = (str: any) => {
  return str.replace(/\//gi, '$2F')
}

export default encodeForwardSlash
