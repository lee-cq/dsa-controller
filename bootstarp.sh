#!/bin/bash

action=$1
shift

case $action in
    install )
        pip install -r requirement.txt  -i https://mirrors.aliyun.com/pypi/simple/
        ;;

    makedb )
        python manage.py makemigrations ; wait ;
        python manage.py migrate ;
        ;;

    start )
        exec python manage.py runserver "$@" ;
        ;;

    createsuperuser )
        exec python manage.py createsuperuser ;
        ;;

    * )
        echo Error Command ;
        ;;

esac

