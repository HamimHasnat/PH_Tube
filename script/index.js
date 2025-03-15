function loadCategory() {
  // 1- fetch data from the api
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2- convert promise to json
    .then((res) => res.json())
    //   send data to display
    .then((data) => displayCategory(data.categories));
}

function loadVideos(searchText = "") {
  // fetch ekta promise return kore
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    // fetch er promise take json a convert kore return kore dicchi
    .then((res) => res.json())
    // json object take data te convert kore dicchi
    // data er por . diye videos add korar por amra array of object pacchi , ar array object gulake jodi func displayVideos a pathiye day tahole console.log ar likhte hobe na just function name ta bosiye dile hobe.
    .then((data) => {
      removeActiveClass();
      //  jokhon kew html er (all button) button a click korbe tokhon loadvideo func call hobe and loadvideo func baki sob activeClass remove kore dibe  kore diye (all button) k active rakbe
      document.getElementById("btn-all").classList.add("active");
      displayVideo(data.videos);
    });
}

// music click korle music o active mane red hoye thakto ,comedy select korle otaw red hoye thakto,mane jetai select kortam setar por jodi areka button select kori ,ager tar color change na hoye duitai ba 3 ta select korle 3tai red hoye thakto, ei somossa theke mukti pawar jonno ei removeActiveClass function, jeta select korbo otai red thakbe baki gula ager obosthai fire jabe,mane auto refresh hobe.
function removeActiveClass() {
  // call korar por joto gula button a active class ache sob gula dhore niye asbe
  const activeButton = document.getElementsByClassName("active");
  // orthad loop akare button active korbe,porer ta click korle ager active ta deactive hoye jabe
  // tar upor loop chalabe
  for (let btn of activeButton) {
    // ebong protita button theke active class remove kore diba kaj shes hole
    btn.classList.remove("active");
  }
}

const loadCategoryVideos = (id) => {
  //  console.log(id)
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url);

  fetch(url)
    .then((res) => res.json())
    // dispalyVideo function er sathe poricoy koriye same card use kore data show kortese
    .then((data) => {
      // fixed acive off hobe removeActiveClass() ei tar karone
      // code serialy run hoye ekhane asar por ami bollam removeActiveClass() k vai tumi giye tumr function take call korba.
      removeActiveClass();

      //  eibar bollam tumi giye ${id mane} mane clickedButton ke niye aso , eikhane categoryID dhore clickedButton niye aste bola hoyeche, orthad jokhon j button dhorbo she button a kaj korbe she ba active hobe.
      const clickedButton = document.getElementById(`btn-${id}`);
      // tarmane je button click korbo se button chara ar kuno button a active_class ar active thakbena shudhu matro selected button chara. eita active howar sathe sathe ei code giye index.html er style er vitor active class er style ta on kore dibe. mane active thakle red thakbe nohoi default white
      clickedButton.classList.add("active");
      // console.log(clickedButton);
      displayVideo(data.category);
    });
};
// loadCategoryVideos()

const loadVideoDetails = (videoId) => {
  console.log(videoId);
const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
fetch(url)
  .then((res) => res.json())
  .then((Idata) => displayVideoDetails(Idata.video));
};

const displayVideoDetails=(video) => {
document.getElementById("video_details").showModal();
const detailsContainer = document.getElementById("details_Container");
detailsContainer.innerHTML = `

<div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
   <h2>${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>

`;
}




function displayCategory(categories) {
  //    console.log(categories);
  // get the container i mean html container where i add this data to show
  const categoryContainer = document.getElementById("category-container");

  // loop operation on array of object
  // categories tmr vitor jotogula object ache sob gulake ekbar ekbar kore cate er vitore dhukaba.
  for (let cate of categories) {
    // console.log(cate)
    // create element using backtick
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
     <button id="btn-${cate.category_id}" onclick="loadCategoryVideos(${cate.category_id})" class="btn btn-sm hover:bg-red-600 hover:text-white">${cate.category}</button>
    `;
    // appendChild element with parent
    categoryContainer.append(categoryDiv);
  }
}

// ভিডিও প্রদর্শনের ফাংশন
const displayVideo = (videos) => {
  //   console.log(videos);
  const vContainer = document.getElementById("video-Container");
  // to remove previous data
  vContainer.innerHTML = "";

  // ২. যদি কোনো ভিডিও না থাকে, তাহলে মেসেজ দেখানো
  // if (!videos.length) { // ✅ `videos.length == 0` লেখার দরকার নেই
  if (videos.length == 0) {
    vContainer.innerHTML = ` 
      <div class="col-span-full text-center flex flex-col justify-center items-center py-20 ">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
      <h2 class=" text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
      </div>
      
      `;
    return;
  }
  // forEach videos er protiti element k iterate korbe , forEach er vitore arekta function likhi
  // ekhane object er protiti element hocche ek ekta video
  videos.forEach((element) => {
    // console.log(element);
    // create div element
    const videoCard = document.createElement("div");
    //using backtick create element for card to show video
    videoCard.innerHTML = `<div class="card bg-base-100 ">
  <figure class="relative">
    <img class="w-full h-[150px] object-cover"
      src="${element.thumbnail}"
      alt="Shoes"/>
      <span class="absolute bottom-2 right-2 bg-black text-sm text-white px-2 rounded-sm">3hrs 56 min ago</span>
  </figure>

  <div class="flex gap-3 px-0 py-5">
    <div class="profile ">
      <div class="avatar">
  <div class="ring-primary ring-offset-base-100 w-6  rounded-full ring ring-offset-2">
    <img  src="${element.authors[0].profile_picture}" />
  </div>

</div>
    </div>
    <div class="intro">
      <h2 class=" text-sm font-semibold">${element.title}</h2>
      <p class="text-sm text-gray-400 flex gap-1 ">${
        element.authors[0].profile_name
      } ${
      element.authors[0].verified == true
        ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=32&id=2AuMnRFVB9b1&format=png" alt="">`
        : ``
    }</p>
      <p class="text-gray-600 text-sm">${element.others.views}</p>
    </div>

  </div>
<button onclick="loadVideoDetails('${
      element.video_id
    }')" class="btn btn-block">Show Details</button>
</div>
  
  `;
    vContainer.appendChild(videoCard);
  });
};

document.getElementById("search_input").addEventListener("keyup", (e) => {
  const input = e.target.value;
loadVideos(input);
});

// loadVideos();
loadCategory();
