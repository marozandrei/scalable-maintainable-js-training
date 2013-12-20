/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
	
	$('#inquirer').inquirer({'callback':function(sum)
	{
		alert(sum);
	}});
	
	$('#inquirer2').inquirer({'callback':function(sum)
	{
		$('#inquirer2').outcome({'totalPoints':sum});
	}});
});
