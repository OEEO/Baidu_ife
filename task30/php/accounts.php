<?php
    //设置页面内容是html编码格式是utf-8
    // header("Content-Type: text/plain;charset=utf-8");
    // header("Content-Type: application/json;charset=utf-8");
    header("Access-Control-Allow-Origin:*");
    header("Access-Control-Allow-Methods:GET,GET");
    //header("Content-Type: text/xml;charset=utf-8");
    //header("Content-Type: text/html;charset=utf-8");
    //header("Content-Type: application/javascript;charset=utf-8");
    $accounts = array(
        '18718401785' => 'wcz41592653',
        '137831244@qq.com' => 'wcz41592653',
        '814731008@qq.com' => '12456'
    );

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        search();
    }

    function search(){
        if (!isset($_GET['username']) || empty($_GET['username'])) {
            echo '{"success":false,"msg":"请填写用户名"}';
            return;
        }

        global $accounts;
        $username = $_GET['username'];
        $result = '{"success":false,"msg":"帐号不存在"}';
        foreach ($accounts as $key => $value) {
            if ($key == $username) {
                $result = '{"success":true,"msg":"帐号填写正确"}';
                break;
            }
        }
        echo $result;
    }


 ?>