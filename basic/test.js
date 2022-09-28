// function foo() {
//     var a = 1;
//     let b = 2;
//     {
//       let b = 3;
//       var c = 4;
//       let d = 5;
//       console.log(a);
//       console.log(b);
//     }
//      console.log(c);
//     console.log(d);
//   }
//   foo();


  function foo() {
    var myName = "极客邦";
    function bar() {
        console.log(myName);
    }
    bar();
  }
  var myName = "极客时间";
//   bar()
  foo();

// function foo() {
//     var myName = "zhaotao";
//     let test1 = 1;
//     var innerBar = {
//       getName: function () {
//         console.log(test1);
//         return myName;
//       },
//       setName: function (newName) {
//         myName = newName;
//       },
//     };
//     return innerBar;
//   }
//   var bar = foo();
//   bar.setName("zhaoyouxiu");
//   console.log(bar.getName());