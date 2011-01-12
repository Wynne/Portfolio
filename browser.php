<?php
/*****************************************************************

	This part added by minimal design
	http://minimaldesign.net/
	
	Just remove whatever browser conditional you don't need,
	change the file uri to your css files,
	and add this in each header of your pages
	UNDER the main CSS file call
	(if not, it won't override the default):
	
	<?php css_add(); ?>
	
	of course, you also need something like that on top:
	
	<?php require_once('./path_to_this_file/browser.php'); ?>
	
******************************************************************/

function css_add() {
	$css_dir = './_css/'; // change that to where your CSS files are
	
	$br = new Browser;
	if ($br->Platform == 'Windows' && $br->Name == 'MSIE') {
	  if ($br->Version > 7) {
			$css_file = 'ie8';
		}
		if ($br->Version <= 7) {
			$css_file = 'ie';
		}
	} elseif ($br->Platform =='iPhone') {
		$css_file = 'iphone';
	} elseif ($br->Name =='Firefox') {
		$css_file = 'firefox';
	} elseif ($br->Name =='Opera') {
		$css_file = 'opera';
	} elseif ($br->Name =='Safari') {
		$css_file = 'safari';
	} elseif ($br->Name =='OmniWeb') {
		$css_file = 'omniweb';
	}
	
	$file_name = $css_dir.$css_file.'.css';
	
	if (file_exists($file_name)) {
		echo("<link href=\"".$file_name."\" rel=\"stylesheet\" type=\"text/css\" media=\"screen\" />\r\r");
	}
}

/*****************************************************************

	File name: browser.php
	Author: Gary White
	Last modified: November 10, 2003
	
	**************************************************************

	Copyright (C) 2003  Gary White
	
	This program is free software; you can redistribute it and/or
	modify it under the terms of the GNU General Public License
	as published by the Free Software Foundation; either version 2
	of the License, or (at your option) any later version.
	
	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details at:
	http://www.gnu.org/copyleft/gpl.html

	**************************************************************

	Browser class
	
	Identifies the user's Operating system, browser and version
	by parsing the HTTP_USER_AGENT string sent to the server
	
	Typical Usage:
	
		require_once($_SERVER['DOCUMENT_ROOT'].'/include/browser.php');
		$br = new Browser;
		echo "$br->Platform, $br->Name version $br->Version";
	
	For operating systems, it will correctly identify:
		Microsoft Windows
		MacIntosh
		Linux

	Anything not determined to be one of the above is considered to by Unix
	because most Unix based browsers seem to not report the operating system.
	The only known problem here is that, if a HTTP_USER_AGENT string does not
	contain the operating system, it will be identified as Unix. For unknown
	browsers, this may not be correct.
	
	For browsers, it should correctly identify all versions of:
		Amaya
		Galeon
		iCab
		Internet Explorer
			For AOL versions it will identify as Internet Explorer (AOL) and the version
			will be the AOL version instead of the IE version.
		Konqueror
		Lynx
		Mozilla
		Netscape Navigator/Communicator
		OmniWeb
		Opera
		Pocket Internet Explorer for handhelds
		Safari
		WebTV
*****************************************************************/

class browser{

	var $Name = "Unknown";
	var $Version = "Unknown";
	var $Platform = "Unknown";
	var $UserAgent = "Not reported";
	var $AOL = false;

	function browser(){
		$agent = $_SERVER['HTTP_USER_AGENT'];

		// initialize properties
		$bd['platform'] = "Unknown";
		$bd['browser'] = "Unknown";
		$bd['version'] = "Unknown";
		$this->UserAgent = $agent;

		// find operating system
		if (eregi("win", $agent))
			$bd['platform'] = "Windows";
		// added by minimal design on Sunday, July 8, 2007 for iPhone support
		elseif (eregi("iPhone", $agent))
			$bd['platform'] = "iPhone";
		elseif (eregi("mac", $agent))
			$bd['platform'] = "MacIntosh";
		elseif (eregi("linux", $agent))
			$bd['platform'] = "Linux";
		elseif (eregi("OS/2", $agent))
			$bd['platform'] = "OS/2";
		elseif (eregi("BeOS", $agent))
			$bd['platform'] = "BeOS";

    // test for Internet Explorer
    if (eregi("msie",$agent) && !eregi("opera",$agent)){
			$val = explode(" ",stristr($agent,"msie"));
			$bd['browser'] = $val[0];
			$bd['version'] = $val[1];
		
		// test for MS Pocket Internet Explorer
		}elseif(eregi("mspie",$agent) || eregi('pocket', $agent)){
			$val = explode(" ",stristr($agent,"mspie"));
			$bd['browser'] = "MSPIE";
			$bd['platform'] = "WindowsCE";
			if (eregi("mspie", $agent))
				$bd['version'] = $val[1];
			else {
				$val = explode("/",$agent);
				$bd['version'] = $val[1];
			}
					
		// test for Safari
		}elseif(eregi("safari", $agent)){
			$bd['browser'] = "Safari";
			$bd['version'] = "";
		}
		
		// clean up extraneous garbage that may be in the name
		$bd['browser'] = ereg_replace("[^a-z,A-Z]", "", $bd['browser']);
		// clean up extraneous garbage that may be in the version		
		$bd['version'] = ereg_replace("[^0-9,.,a-z,A-Z]", "", $bd['version']);
				
		// finally assign our properties
		$this->Name = $bd['browser'];
		$this->Version = $bd['version'];
		$this->Platform = $bd['platform'];
		$this->AOL = $bd['aol'];
	}
}
?>
