const verifyEmailTemplate = ({ firstName, url }) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f7fa; padding: 20px; margin: 0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #4CAF50; text-align: center; font-size: 24px; margin-bottom: 20px;">Email Verification</h2>
        
        <p style="font-size: 16px; line-height: 1.5;">Hi ${firstName},</p>
        
        <p style="font-size: 16px; line-height: 1.5;">Welcome to EMS (Employee Management System)! We're excited to have you on board.</p>
        
        <p style="font-size: 16px; line-height: 1.5;">To get started, please confirm your email by clicking the button below:</p>
        
        <a href="${url}" style="
          display: inline-block;
          color: white;
          background-color: #007BFF;
          text-decoration: none;
          padding: 12px 20px;
          border-radius: 5px;
          margin-top: 20px;
          font-weight: bold;
          text-align: center;
        ">
          Verify Your Email
        </a>
        
        <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
          If you didn’t create this account, you can ignore this message.
        </p>
        
        <p style="font-size: 16px; line-height: 1.5;">Best regards,<br/>The EMS Team</p>
        
        <footer style="font-size: 12px; color: #888; text-align: center; margin-top: 40px;">
          <p>&copy; 2025 EMS. All rights reserved.</p>
        </footer>
      </div>
    </div>
  `;
};

export default verifyEmailTemplate;
