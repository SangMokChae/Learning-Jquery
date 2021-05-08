const axios = require("axios"); 
// axios 특정 url을 넣으면 그 url에 해당하는 page의 html을 모두 가져온다.
// python으로 치면 bs4같은 것
const cheerio = require("cheerio");
// 가져온 자료들에 파싱이 가능케 도와준다(JQuery 같은 느낌)

const getHTML = async(keyword) => {
  try {
    return await axios.get("https://www.inflearn.com/courses?s=" + encodeURI(keyword)); // keyword에는 검색어가 해당이 된다.
    // get("") -> get안에 url을 넣어 주면 url에 해당하는 코드들을 모두 나에게 넘겨준다.
    // keyword가 한글이기 때문에 encodeURI()로 감싸 줘서 검색이 가능토록 인코드 한다.
  } catch(err) {
    console.log(err);
  }
};
// parameter 값으로 keyword를 던진다. // 여기서 keyword는 검색했을때의 검색어에 해당이 된다.

const parsing = async (keyword) => {
  const html = await getHTML(keyword); // 내가 원하는 html이 들어 올 것이다.
  // console.log(html);
  const $ = cheerio.load(html.data);
  // parsing을 위해 cheerio를 가져옴
  // cheerio에 html.data를 넣어준다. 가져온 html코드는 data가 되었다.
  const $courseList = $(".course_card_item");
  // $()를 JQuery 사용 처럼 사용
  // 모든 리스트를 $courseList 안에 담아주는 형태로 저장한다.

  let courses = []; // 배열 선언

  $courseList.each((idx, node) => {
    const title = $(node).find(".course_title").text(); // find는 안에 있는 class or id, name등으로 찾을 수 있다.
    // console.log(title); // 해당 페이지의 제목을 가져온다.
    courses.push({
      title : $(node).find(".course_title:eq(0)").text(), // 첫번째 꺼를 출력하기 위해서 :eq(0)를 추가로 작성해준다. 2개의 node중에 :eq(0)를 해서 첫번째 node를 parsing 해준다.
      instructor : $(node).find(".instructor").text(),
      price : $(node).find(".price").text(),
      rating : $(node).find(".star_solid").css("width"), // css를 사용하는 방식
      img : $(node).find(".card-image > figure > img").attr("src"), // > 을 사용해서 안에 있는 테그 접근이 가능하다. / attr(attribute를 통해서 src의 url을 가져온다.)
    })
  }); // each는 for문 사용 하는 거와 같다.

  console.log(courses);
}
// 실제적으로 가져온 html을 parsing하는 작업코드

parsing("자바스크립트");