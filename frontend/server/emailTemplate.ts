/**
 * Generate a magic link verification email template
 * @param link {string} - The magic link to send.
 */
const emailTemplate = (link: string): string =>
  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
   <html xmlns="http://www.w3.org/1999/xhtml">
   <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <style type="text/css">.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img{line-height:100%}#outlook a{padding:0}.ExternalClass,.ReadMsgBody{width:100%}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic;border:0;height:auto;outline:0;text-decoration:none}table{border-collapse:collapse!important}#bodyCell,#bodyTable,body{height:100%!important;margin:0;padding:0;font-family:Lato,sans-serif}#bodyCell{padding:20px}#bodyTable{width:600px}@font-face{font-family:Lato;src:url(https://fonts.googleapis.com/css?family=Lato&display=swap);src:url(https://fonts.googleapis.com/css?family=Lato&display=swap?#iefix) format('embedded-opentype'),url(https://fonts.googleapis.com/css?family=Lato&display=swap);src:url(https://fonts.googleapis.com/css?family=Lato&display=swap?#iefix) format('embedded-opentype'),url(https://fonts.googleapis.com/css?family=Lato&display=swap);font-weight:600;font-style:normal}@media only screen and (max-width:480px){#bodyTable,body{width:100%!important}a,blockquote,body,li,p,table,td{-webkit-text-size-adjust:none!important}body{min-width:100%!important}#bodyTable{max-width:600px!important}#signIn{max-width:280px!important}}
      </style>
    </head>
    <body
      leftmargin="0"
      marginwidth="0"
      topmargin="0"
      marginheight="0"
      offset="0"
      style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;margin: 0;padding: 0;font-family: &quot;Lato&quot;, sans-serif;height: 100% !important;"
    >
      <center>
      <table
        style="width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: &quot;Lato&quot;, sans-serif;border-collapse: collapse !important;height: 100% !important;"
        align="center"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        id="bodyTable"
      >
        <tr>
          <td align="center" valign="top" id="bodyCell" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: &quot;ProximaNova&quot;, sans-serif;height: 100% !important;">
            <div class="main">
              <p style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;">
                <img
                  src="https://i.imgur.com/KzAnU0n.png"
                  width="150"
                  alt="IdeaDog logo"
                  style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"
                 >
              </p>

              <p
                style="font-size: 1.2em;line-height: 1.3;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"
              >
                Click the magic link below to verify your account and sign in to IdeaDog. This link will expire in 15 minutes.
              </p>

              <div style="text-align:center">
                <a
                  id="signIn"
                  style="text-transform: uppercase;letter-spacing: 1px;color: #ffffff;text-decoration: none;display: inline-block;min-height: 48px;line-height: 48px;padding-top: 0;padding-right: 26px;padding-bottom: 0;margin: 20px 0;padding-left: 26px;border: 0;outline: 0;background: #eb5424;font-size: 14px;font-style: normal;font-weight: 400;text-align: center;white-space: nowrap;border-radius: 3px;text-overflow: ellipsis;max-width: 280px;overflow: hidden;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"
                  href="${link}"
                >
                  Sign in to IdeaDog
                </a>
              </div>
              <p
                style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"
              >
                <a
                  style="font-size: 12px; color: #A9B3BC; text-decoration: none;word-break: break-all;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;"
                  href="${link}"
                >
                  ${link}
                </a>
              </p>

              <p style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                Upon click, you will be redirected back to IdeaDog. Note that verification will only succeed in the same browser you submitted the login request.
              </p>
              <p style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                Go share some awesome ideas - bonus points if they are dog-related!
              </p>
        
              Thank You!
              <br>

              <strong>IdeaDog</strong>

              <br />
              <br />
              <hr style="border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;">
              <p style="text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                Did this email reach the wrong person? Please contact us at support@ideadog.site.
              </p>
            </div>
          </td>
        </tr>
      </table>
    </center>
  </body>
</html>`;

export default emailTemplate;
