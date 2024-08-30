export const validateFirstName = (firstName: string) => {
    if (!firstName) {
      return 'First name is required';
    } else if (firstName.length < 3) {
      return 'First name must be greater than 2 characters';
    } else if (/\d/.test(firstName)) {
      return 'First name must not contain numbers';
    }
    return '';
  };
  
  export const validateLastName = (lastName: string) => {
    if (!lastName) {
      return 'Last name is required';
    } else if (lastName.length < 3) {
      return 'Last name must be greater than 2 characters';
    } else if (/\d/.test(lastName)) {
      return 'Last name must not contain numbers';
    }
    return '';
  };
  
  export const validateGender = (gender: string) => {
    if (!gender) {
      return 'Gender is required';
    }
    return '';
  };
  
  export const validateEmail = (email: string) => {
    const emailPattern = /^[\w-]+@x\.dummyjson\.com$/;
    if (!email) {
      return 'Email is required';
    } else if (!emailPattern.test(email)) {
      return 'Email must be a valid email ending with "@x.dummyjson.com"';
    }
    return '';
  };
  
  export const validatePhone = (phone: string) => {
    const phonePattern = /^\d{10}$/;
    if (!phone) {
      return 'Phone number is required';
    } else if (!phonePattern.test(phone)) {
      return 'Phone number must be exactly 10 digits';
    }
    return '';
  };
  
  export const validateUsername = (username: string) => {
    if (!username) {
      return 'Username is required';
    } else if (username.length < 6 || username.length > 12) {
      return 'Username must be between 6 and 12 characters long';
    }
    return '';
  };
  
  export const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      return 'Password is required';
    } else if (!passwordPattern.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
  };
  
  export const validateHeight = (height: string) => {
  if(!height){
    return 'height is required';
  }
    else if (parseInt(height) < 130 || parseInt(height) > 230) {
      return 'Height must be a number between 130 and 230 cm';
    }
    return '';
  };
  
  export const validateWeight = (weight: string) => {
    if(!weight){
      return 'weight is required';
    }
    else if (parseInt(weight) < 30 || parseInt(weight) > 160) {
      return 'Weight must be a number between 30 and 160 kg';
    }
    return '';
  };
  



  