#!/bin/bash
while read line;
    do
        read -a str <<< $line
        key=`echo $line | cut -d'=' -f1`
        val=`echo $line | cut -d'=' -f2`
        export key=val
    done < .env
