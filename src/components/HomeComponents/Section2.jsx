import React from "react";
import testPhoto from "../../assets/images/ui.png";
import Game from "../../assets/images/metaverse-blockchain-technology-concepts-person-enjoying-experiences-metaverse-virtual-world-futuristic-tone (2).jpg";
import Education from "../../assets/images/biosensor-technology-concepts-new-experiences-with-metaverse-web3-blockchain-hand-interacting-with-computer-graphic-surrealism-butterfly-via-biosensor-tech.jpg";
import Shop from "../../assets/images/5348934.jpg";
import Sport from "../../assets/images/metaverse-technology-concept-man-wear-vr-goggles-have-fun-play-boxing-game-virtual-world (1).jpg";
import Land from "../../assets/images/metaverse-city-with-connection-3d-render.jpg";
import Character from "../../assets/images/sova.png";

import "./Home.Section.css";

//=================================================== Section Data =====================================================//
export const CardData = [
  {
    img: Land,
    title: "Land Just for You",
    disc: "Users can own lands ,which are non fungible tokens. Conducting digital transactions is secure. And use to build your own land, as well as selling , advertising etc",
  },
  {
    img: Character,
    title: "Your Character in Metaverse",
    disc: "-  Produced by creatives from game visual effects studios “ Ready Player me “",
    disc2:
      "- Create the character that's suitable for you using the customization tools",
  },

  {
    img: Shop,
    title: "Shop & Commerce",
    disc: "- New shopping experience",
    disc2: "- Virtual shopping",
    disc3: "- Phygital Asset",
  },
  {
    img: Game,
    title: "Experience The Game",
    disc: "-  Enjoy the game by playing various forms of Event games",
    disc2:
      "- There are numerous prizes available, including the rarest of Items",
  },
  {
    img: Education,
    title: "Virtual Education",
    disc: "A new educational model that allows for a more diverse range of learning opportunities",
  },
  {
    img: Sport,
    title: "New World Sports",
    disc: "- AR/VR/XR/MR Sports Experiences",
    disc2: "- A new sport that will increase your enjoyment",
  },
];

function Section2() {
  return (
    <div className="w-full bg-gradient-to-t from-[#14004B] to-[#080418]">
      <div className="grid xl:grid-cols-2 lg:grid-cols-1 justify-items-center pb-[50px] px-[30px]">
        {CardData.map((card, index) => {
          return (
            <div key={index} className="">
              <div className="rounded-2xl overflow-hidden shadow-lg  bg-black  lg:h-[803px] mt-[30px] lg:w-[700px] xl:w-[580px] 2xl:w-[800] 3xl:w-[660px] 4xl:w-[900px] hover:scale-[0.95] duration-500 ease-out-expo">
                <div>
                  <img
                    className="w-[900px] lg:h-[460px] sm:h-[230px]"
                    src={card.img}
                  />
                </div>
                <div className="p-8 [ xl:p-[50px] ]">
                  <div className="text-start  text-[#DB46FF] sm:text-[26px] lg:text-[28px] 3xl:text-[38px] mb-[10px] font-bold test">
                    {card.title}
                  </div>

                  <div className="text-start text-neutral-300/90 max-w-[600px] test1">
                    {card.disc}
                    <br />
                    {card.disc2}
                    <br />
                    {card.disc3}
                  </div>
                </div>
                <div className="text-center sm:mb-[30px]">
                  <button className="btnview h-[50px] w-[250px] px-4 py-2 text-[#DB46FF] text-[20px] rounded-br-lg rounded-tl-lg">
                    View Feture
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function Section2() {
//   return (
//     <div className="w-full bg-gradient-to-t from-[#14004B] to-[#080418]">
//       <div className="grid grid-cols-2 gap-3 p-[100px] justify-items-center sm:grid-cols-1 lg:grid-cols-2">
//         {CardData.map((card, index) => {
//           return (
//             <div
//               key={index}
//               className=" xl:pl-[30px] lg:px-[30px] 2xl:mt-[30px] xl:mt-[60px] lg:mt-[20px]"
//             >
//               <div className="rounded overflow-hidden shadow-lg  bg-gray-900 xl:w-[800px]">
//                 <img src={card.img} />
//                 <div className="px-6 py-4 sm:py-[2px] lg:py-4">
//                   <div className="text-[16px] text-white text-center  max-w-lg sm:text-[10px] sm:mt-[10px] lg:text-[14px] lg:mt-[20px] xl:text-[16px] xl:mt-[30px]">
//                     {card.disc}
//                   </div>
//                   <div className="text-center sm:mt-[15px] sm:mb-[15px] 2xl:mt-[34px] mb-[30px] lg:mt-[24px] xl:mt-[34px]">
//                     <button className="btnview h-[45px] w-[165px] px-4 py-2 sm:py-[1px] text-[#DB46FF] rounded-md sm:w-[100px] sm:h-[30px] sm:mt-[10px] lg:w-[165px] lg:h-[45px] ">
//                       <div className="sm:text-[10px] lg:text-[16px] " > View Feature</div>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               ;
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

export default Section2;
