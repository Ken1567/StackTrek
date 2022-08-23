function operation_1 (firstVal, secondVal, thirdVal)
{
    const operation_2 = (firstVal, thirdVal) =>
    {
      let ret = 0;
      let copy = firstVal;
      while(firstVal >= thirdVal) {
          firstVal -= thirdVal;
          ret += 1;
      }
      return copy - ret*thirdVal;
    }
    const operation_3 = (firstVal, thirdVal) =>
    {
      let rep = 0;
      for(let i=1; i<=firstVal; i++){
          rep += firstVal;
      }
      rep = operation_2(rep, thirdVal);
      return rep;
    }
    const operation_4 = (secondVal) =>
    {
      let res = 0;
      while(secondVal-res > 1){
          secondVal -= 1;
          res += 1;
      }
      return res;
  }
      if(secondVal == 0) {
          return 1;
      } else if(secondVal == 1) {
          return operation_2(firstVal, thirdVal);
      } else {
          let fourthVal = operation_1(operation_3(firstVal, thirdVal), operation_4(secondVal), thirdVal);
          if(secondVal%2 == 1) {
              return operation_2(firstVal*fourthVal, thirdVal);
          } else {
              return fourthVal;
          }
      }
  }
  console.log(operation_1(3,2,4));
  console.log(operation_1(4,3,2));
console.log(operation_1(9,6,19));