const validate = values => {
    const errors = {}
        if (values.price_min ==='' && values.price_max !==''){   
            errors.price_max ="Price Min phải có giá trị "         
        }
        else if(parseInt(values.price_max)  < parseInt(values.price_min) ){           
            errors.price_max ="Giá trị phải lớn hơn " + values.price_min;
        }
    // if (!values.price_max) {
    //   errors.title = 'Tiêu đề phải có'
    // } else if (values.title.length < 5) {
    //   errors.title = 'Tieeu đề phải lớn hơn 5 ký tự'
    // } else if (values.title.length > 10) {
    //     errors.title = 'Must be 10 characters or less'
    // }

    if (!values.email) {
      errors.email = 'Vui lòng nhập email....'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email không hợp lệ'
    }
    // if (!values.age) {
    //   errors.age = 'Required'
    // } else if (isNaN(Number(values.age))) {
    //   errors.age = 'Must be a number'
    // } else if (Number(values.age) < 18) {
    //   errors.age = 'Sorry, you must be at least 18 years old'
    // }
    return errors
  }

  export default validate;