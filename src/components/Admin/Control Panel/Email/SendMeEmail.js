import emailjs from 'emailjs-com';

const SendMeEmail = (formInfo) => {

    const templateParams = {

        form: formInfo
    }

    emailjs.send('service_u9kzxrn', 'template_q05wqfw', templateParams, 'user_pzAaMmdlZT8AeiI7rZAm2')
}

export default SendMeEmail
