<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page isELIgnored="false" %>
      <link href="/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/mmss.css"/>
<script src="/js/address.js" type="text/javascript"></script>
                <br/>
                  <!--添加管理员-->
                                    <div class="modal-body">
                                        <ul>
                                        <input type="text" style="border:none;" id="falseMsm" name="falseMsm"/>
                                       		 <li>
                                                <label><span>地区：</span></label>
											    <select  name="province"  id="select_province"></select>
											    <select   name="city"  id="select_city"></select>
											    <select   name="street"  id="select_area"></select>
                                            </li>
                                             <li>
                                                <label><span>账号：</span></label>
                                                <input type="text" id="name" name="name"/>
                                            </li>
                                            <li>
                                                <label><span>电话：</span></label>
                                                <input type="text" id="tel" name="tel"/>
                                            </li>
                                            <li>
                                                <label><span>密码：</span></label>
                                                <input type="password" id="password" name="password"/>
                                            </li>
                                        </ul>
                                    </div>
<script>
region_init("select_province","select_city","select_area");
</script>