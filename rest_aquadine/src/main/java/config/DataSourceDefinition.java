package config;

import javax.ejb.Stateless;

@javax.annotation.sql.DataSourceDefinition(
        name = "java:global/jdbc/aquadine",
        className = "com.mysql.cj.jdbc.MysqlXADataSource",
        url = "jdbc:mysql://aquadine.nl:3306/aquadine",
        user = "root",
        password = "aquadine")
@Stateless

public class DataSourceDefinition {
}
