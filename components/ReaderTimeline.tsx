

// @import "bourbon";

// // Settings
// $slider-track--color--default: #CCC;
// $slider-track--color--start: #1ABC9C;
// $slider-track--color--middle: #F1C40F;
// $slider-track--color--end: #E74C3C;
// $slider-track--radius: 10px;
// $slider-track--height: 14px;
// $slider-track--border-width: 0;
// $slider-handle--size: 28px;
// $slider-handle--dot--size: $slider-handle--size - 10px;

// %track--defaults {
//   height: $slider-track--height;
//   border: {
//     radius: $slider-track--radius;
//     width: $slider-track--border-width;
//   }
// }

// // Layout
// body {
//   background: #F0F0F0;
//   font-family: Helvetica, Arial;
// }

// h1 {
//   text-align: center;
//   color: #444;
//   margin-top: 50px;
// }
  
// #slider-container {
//   width: 80%;
//   height: 80px;
//   @include box-sizing(border-box);
//   position: relative;
//   top: 50%;
//   margin: 0 auto;
//   text-align: center;
//   background: #FFF;
//   border-radius: 5px;
//   padding: 35px 40px 30px 40px;
//   box-shadow: 0 10px 30px rgba(0,0,0,0.2);
// }

// // Slider widget
// .ui-slider {
//   * { outline: none; }
//   @extend %track--defaults;
  
//   @include linear-gradient(to right, $slider-track--color--start 0%, $slider-track--color--middle 50%, $slider-track--color--end 100%);
  
//   .slider-range-inverse {
//     @extend %track--defaults;
//     background: $slider-track--color--default;
//     position: absolute;
//     right: 0;
//   }
  
//   .ui-slider-range {
//     @extend %track--defaults;
//     background: transparent; 
//   }
  
//   .ui-slider-handle {
//     width: $slider-handle--size;
//     height: $slider-handle--size;
//     cursor: pointer;
//     box-shadow: 0 3px 8px rgba(0,0,0,0.4);
//     background: #FFF;
//     top: -($slider-handle--size - $slider-track--height) / 2;
//     border: {
//       radius: 50%;
//       width: 0;
//     }
    
//     &:active { box-shadow: 0 3px 20px rgba(0,0,0,0.5); }
        
//     .dot {
//       width: $slider-handle--dot--size;
//       height: $slider-handle--dot--size;
//       border-radius: 50%;
//       position: absolute;
//       top: ($slider-handle--size - $slider-handle--dot--size) / 2;
//       left: ($slider-handle--size - $slider-handle--dot--size) / 2;
//       background: transparent;
//       overflow: hidden;
      
//       .handle-track {
//         display: block;
//         height: $slider-handle--dot--size;
//         @include linear-gradient(to right, $slider-track--color--start 0%, $slider-track--color--middle 50%, $slider-track--color--end 100%);
//         position: absolute;
//         padding-right: $slider-handle--dot--size;
//       }
//     }
//   }
// }

const ReaderTimeline = () => {
  return (
    <div id="slider-container" className="w-4/5 h-6 relative bg-white rounded-lg m-auto">
      <div id="js-slider">
      <div className="slider-range-inverse"></div>
      <span className="dot"><span className="handle-track"></span></span>
      </div>
    </div>
  )
}

export default ReaderTimeline
