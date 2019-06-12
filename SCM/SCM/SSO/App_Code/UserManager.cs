using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.Data.SqlClient;

/// <summary>
/// Summary description for UserManager
/// </summary>
public class UserManager
{
	public UserManager()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    /// <summary>
    /// Authenticates user from the system. A hard-coded logic is used for demonstration
    /// </summary>
    /// <param name="UserName"></param>
    /// <param name="Password"></param>
    /// <returns></returns>
    public static WebUser AuthenticateUser(string UserName, string Password)
    {
        
        WebUser user = null;
        try
        {
           
            SqlParameter[] spParameter = new SqlParameter[2];
            spParameter[0] = new SqlParameter("@UserName", UserName);
            spParameter[1] = new SqlParameter("@Password",AESEncryption.EncryptIOS(Password));
            using (SqlDataReader UserDetails = SqlHelper.ExecuteReader(SqlHelper.GetConnectionString("ConnectionString"), "[Get_AuthenticateUser]", spParameter))
            {
                if (UserDetails.Read())
                {
                    if (UserDetails.HasRows)
                    {
                        user = new WebUser();
                        user.UniqueId = AESEncryption.EncryptIOS(Convert.ToString(UserDetails["UserName"]));
                        user.UserName = Convert.ToString(UserDetails["UserName"]);
                        user.Password = AESEncryption.DecryptIOS(Convert.ToString(UserDetails["Password"]));
                        
                    }


                }
            }
            if (user != null)
            {
                user.Token = Utility.GetGuidHash();
                
            }

        }
        catch (Exception ex)
        {
            //log error
        }         
        return user;
    }

    /// <summary>
    /// Retrieves a user form the system. A hard-coded logic is used for demonstration
    /// </summary>
    /// <param name="UniqueId"></param>
    /// <returns></returns>
    public static WebUser GetWebUserByUniqueId(string UniqueId)
    {
        WebUser user = null;
        try
        {
            SqlParameter[] spParameter = new SqlParameter[1];
            spParameter[0] = new SqlParameter("@UserName", AESEncryption.DecryptIOS(UniqueId));
            using (SqlDataReader UserDetails = SqlHelper.ExecuteReader(SqlHelper.GetConnectionString("ConnectionString"), "GetUserByToken", spParameter))
            {
                if (UserDetails.Read())
                {
                    if (UserDetails.HasRows)
                    {
                        user = new WebUser();
                        user.UniqueId = AESEncryption.EncryptIOS(Convert.ToString(UserDetails["UserName"]));
                        user.UserName = Convert.ToString(UserDetails["UserName"]);
                        user.Password = AESEncryption.DecryptIOS(Convert.ToString(UserDetails["Password"]));
                    }
                }
            }
        }
        catch (Exception ex)
        {
            //log error
        }
        return user;     
    }
}
