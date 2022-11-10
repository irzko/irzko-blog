const validator = (value, rules) => {
  const returnData = {
    error: false,
    msg: "",
  };
  for (let rule of rules) {
    switch (rule.type) {
      case "isRequired": {
        if (!value) {
          returnData.error = true;
          returnData.msg = rule.errorMsg || "Trường này là bắt buộc";
        }
        break;
      }

      case "isEmail": {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(value)) {
          returnData.error = true;
          returnData.msg = rule.errorMsg || "Email không hợp lệ";
        }
        break;
      }
      case "minLength": {
        if (value.length < rule.min) {
          returnData.error = true;
          returnData.msg =
            rule.errorMsg || `Trường này phải có trên ${rule.min} kí tự`;
        }
        break;
      }

      case "isConfirmed": {
        if (value !== rule.strCompare) {
          returnData.error = true;
          returnData.msg = rule.errorMsg || "Trường này không khớp";
        }

        break;
      }

      // case "isTrueDay": {
      //   returnData.error = true;
      //   let isLeapYear =
      //     (rule.year % 4 == 0 && rule.year % 100 != 0) || rule.year % 400 == 0;
      //   if ()
      //     // returnData.msg =
      // }
    }
    if (returnData.error) {
      break;
    }
  }
  return returnData;
};

export default validator;
