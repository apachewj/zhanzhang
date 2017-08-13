package org.tgcloud.zhanzhang.core;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.dialect.SqlServerDialect;
import com.jfinal.plugin.activerecord.generator.MetaBuilder;
import com.jfinal.plugin.activerecord.generator.TableMeta;

import javax.sql.DataSource;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/**
 * Created by Administrator on 2016/5/23.
 */
public class SqlserverMetaBuilder extends MetaBuilder {


    public SqlserverMetaBuilder(DataSource dataSource) {
        super(dataSource);
    }


    protected ResultSet getTablesResultSet() throws SQLException {
        dialect = new SqlServerDialect();
        return dbMeta.getTables(conn.getCatalog(), "dbo", null, new String[]{"TABLE", "VIEW"});
    }
}
