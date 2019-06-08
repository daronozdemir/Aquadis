import java.sql.*;

public class aquadineDAO {

       public static void get()
        {
            try
            {
                Connection conn = MySQLJDBCUtil.getConnection();

                // our SQL SELECT query.
                // if you only need a few columns, specify them by name instead of using "*"

                String query = "SELECT * FROM users";

                // create the java statement
                Statement st = conn.createStatement();

                // execute the query, and get a java resultset
                ResultSet rs = st.executeQuery(query);

                // iterate through the java resultset
                while (rs.next())
                {
                    int userId = rs.getInt("userId");
                    String name = rs.getString("name");
                    String username = rs.getString("username");
                    String password = rs.getString("password");
                    String email = rs.getString("email");
                    String avatarUrl = rs.getString("avatarUrl");

                    // print the results
                    System.out.format("%s, %s, %s, %s, %s, %s\n", userId, name, username, password, email, avatarUrl);
                }
                st.close();
            }
            catch (Exception e)
            {
                System.err.println("Got an exception! ");
                System.err.println(e.getMessage());
            }
        }
    }
