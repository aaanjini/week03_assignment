// 키값 기준으로 쿠키에 저장된 값을 가져오는 함수
const getCookie = (name) => {
    // 쿠키 값을 가져옵니다.
    let value = "; " + document.cookie;
    // 여러 개의 쿠키들을 ; 기준으로 쪼갭니다.
    let parts = value.split("; " + name + "=");
    // value를 return!
    if (parts.length === 2) {
          return parts.pop().split(";").shift();
      }
  };
  
  // 쿠키에 저장하는 함수
  const setCookie = (name, value, exp = 5) => {
    let date = new Date();
    // 날짜를 만들어줍니다.
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    // 저장!
    document.cookie = `${name}=${value};expires=${date.toUTCString()};`;
  };
  
  // 만료일을 예전으로 설정해 쿠키를 지웁니다.
  const deleteCookie = (name) => {
    let date = new Date("2020-01-01").toUTCString(); //예전 날짜를 가져옴
    document.cookie = name + "=; expires="+date; //만료일을 예전날짜로 돌려버림
  }
  
  export { getCookie, setCookie, deleteCookie };