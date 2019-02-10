const timeouts = {};

export const id = () => Math.floor(Math.random() * Math.floor(10000));

export function debounce({ id, fn, timeout = 400 }) {
  clearTimeout(timeouts[id]);
  timeouts[id] = setTimeout(() => {
    delete timeouts[id];
    fn();
  }, timeout);
}


export const debounceWithoutId = (callback, wait = 400) => {
  let timeout;
  return (params) => {
    console.log(params)
    clearTimeout(timeout);
    timeout = setTimeout(params => callback(params), wait);
  };
};
