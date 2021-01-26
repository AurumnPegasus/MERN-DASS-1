const nodemailer = require('nodemailer'); 
  
  
let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'shivansh.trial@gmail.com', 
        pass: 'B7$chetak'
    } 
}); 
  
let mailDetails = { 
    from: 'shivansh.trial@gmail.com', 
    to: 'subramanian.shivansh@gmail.com', 
    subject: 'Test mail', 
    text: 'Node.js testing mail for GeeksforGeeks'
}; 
  
mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 