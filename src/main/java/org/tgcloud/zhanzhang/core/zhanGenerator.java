package org.tgcloud.zhanzhang.core;

import com.jfinal.kit.PathKit;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.activerecord.dialect.SqlServerDialect;
import com.jfinal.plugin.activerecord.generator.Generator;
import com.jfinal.plugin.druid.DruidPlugin;

import javax.sql.DataSource;

/**
 * Created by Administrator on 2016/1/7 0007.
 */
public class zhanGenerator {
    public static DataSource getDataSource() {
        PropKit.use("jdbc.properties");
        final String URL =PropKit.get("jdbcUrl");
        final String USERNAME = PropKit.get("user");
        final String PASSWORD =PropKit.get("password");
        final Integer INITIAL_SIZE = PropKit.getInt("initialSize");
        final Integer MID_IDLE = PropKit.getInt("minIdle");
        final Integer MAX_ACTIVE = PropKit.getInt("maxActive");
        final String DRIVE_CLASS = PropKit.get("driverClass");
        DruidPlugin druidPlugin = new DruidPlugin(URL,USERNAME,PASSWORD,DRIVE_CLASS);
        druidPlugin.set(INITIAL_SIZE,MID_IDLE,MAX_ACTIVE);
        druidPlugin.start();
        return druidPlugin.getDataSource();
    }
	public static void main(String[] args) {
		// base model 所使用的包名
		String baseModelPackageName = "org.tgcloud.zhanzhang.entity.base";
		// base model 文件保存路径
		String baseModelOutputDir = PathKit.getWebRootPath() + "/src/main/java/org/tgcloud/zhanzhang/entity/base";
		
		// model 所使用的包名 (MappingKit 默认使用的包名)
		String modelPackageName = "org.tgcloud.zhanzhang.entity";
		// model 文件保存路径 (MappingKit 与 DataDictionary 文件默认保存路径)
		String modelOutputDir = PathKit.getWebRootPath() + "/src/main/java/org/tgcloud/zhanzhang/entity";
		
		// 创建生成器
		Generator gernerator = new Generator(getDataSource(), baseModelPackageName, baseModelOutputDir, modelPackageName, modelOutputDir);
		// 设置数据库方言
		gernerator.setDialect(new SqlServerDialect());
		// 添加不需要生成的表名
		gernerator.addExcludedTable("z_notice_qiuzheng","ShopPingProductCommentSet","Z_notice_reply","z_notice_tongzhi","ShopPingProductOrderSet","z_notice_zhengqiu","z_people_need","z_user","z_people_service","z_phonemsm","ShopPingProductOrderDetailsSet","z_praise_info","z_product","z_user_pingbi","z_product_show","z_report_info","z_search_info","z_pay","z_store_info","z_travel_guide","z_travel_scenic","z_manager","z_userclick_info","ZTCommentTable","AdvertisementTable","BusinessHoursSet","CollectionTable","CommentSet","CommentTypeSet","CookTableSet","CrowdTable","CuisineSet","FriendTable","GroupingTable","Hotel_Type","HotelOrderDetails","HotelSet","IBackgroundType","InvitationTable","Message","OrderDetailsSet","OrderSet","OrientationSet","PictureTable","PraiseTable","PrinterConfig","PrintInfo","ProductPropertySet","ProductSet","ProductTypeSet","ProductValueSet","region","ReservationOrderSet","ReservationSet","ReserveType","SecretTable","ShoppingWallProductSet","ShoppingWallProductTypeSet","ShoppingWallTypeProduct","SpecificationTableSet","Store_Blackist","Store_Hotelty","StoreProductPropertySet","StoreProductTypeSet","StoreProductValueSet","StorePropertySet","StoreSet","StoreTypeSet","StoreValueSet","SUMiddleSet","TableMenuSet","TableNumbersSet","TableSet","TableState","TalkaboutTable","Temporary","UserAddressSet","UserAlbum","UserAuth","UserDetails","UserGroupTable","UserTypeCenterTableSet","UserTypeSet","WaiterOpeOrder","WaiterTable","z_ad","z_ad_apply","z_ad_apply_days","z_cards","z_click_info","z_company","z_company_contact","z_company_goods","z_company_link","z_company_news","z_company_support","z_company_work","z_context_path","z_crowd","z_crowd_donate","z_crowd_hongshizi","Z_crowd_reply","z_crowd_shenfen","z_crowd_yiyuan","z_crowd_zhanghao","z_findwork","z_findwork_place","z_findworker","z_img_path","z_info_url","z_local","T_Transport","z_marry","z_master","z_master_notice","z_master_p","T_Lieban","z_master_scope","z_notice_baoming","z_money_out","z_notice_baoming_apply","ShoppingwallproductDetails","z_notice_fankui","Z_notice_pinglun","z_notice_praise"
);
		// 设置是否在 Model 中生成 dao 对象
		gernerator.setGenerateDaoInModel(true);
		// 设置是否生成字典文件
		gernerator.setGenerateDataDictionary(true);
        gernerator.setMetaBuilder(new SqlserverMetaBuilder(getDataSource()));
		// 生成
		gernerator.generate();
	}
}
