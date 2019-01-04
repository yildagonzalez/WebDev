<?php

use Base\User as BaseUser;

/**
 * Skeleton subclass for representing a row from the 'user' table.
 *
 *
 *
 * You should add additional methods to this class to meet the
 * application requirements.  This class will only be generated as
 * long as it does not already exist in the output directory.
 *
 */
class User extends BaseUser
{
    public function setPassword($v){
        // Hashed password
        return password_hash($v, PASSWORD_DEFAULT);;
    }

    public function login($p){
        if (password_verify($p, $this->getPasswordHash())) {
            return true;
        } 
        else {
            return false;	
        }

    }

    public function userExists($u){
        $user = UserQuery::create()
        ->filterByUsername($u)
        ->findOne();

        return $user;
    }


}
