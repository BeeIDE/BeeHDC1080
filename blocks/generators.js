function check_if_top_block_has_hat(block){
   if (block.getRootBlock().hat === 'cap') return true;
   else return false;
}

Blockly.Python['hdc_temperature'] = function(block) {
   if (!check_if_top_block_has_hat(block)) return ['', Blockly.Python.ORDER_NONE];
   Blockly.Python.definitions_['from_BeeBrain_import_bee'] = 'from BeeBrain import bee';
   Blockly.Python.definitions_['from_BeeHDC1080_import_BeeHDC1080'] = 'from BeeHDC1080 import BeeHDC1080';

   var port = block.getFieldValue('port');
   Blockly.Python.definitions_['hdc1080_BeeHDC1080'] = `hdc1080 = BeeHDC1080(bee.${port})`;

   var code = `hdc1080.read_temperature()`;
   return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['hdc_humidity'] = function(block) {
   if (!check_if_top_block_has_hat(block)) return ['', Blockly.Python.ORDER_NONE];
   Blockly.Python.definitions_['from_BeeBrain_import_bee'] = 'from BeeBrain import bee';
   Blockly.Python.definitions_['from_BeeHDC1080_import_BeeHDC1080'] = 'from BeeHDC1080 import BeeHDC1080';

   var port = block.getFieldValue('port');
   Blockly.Python.definitions_['hdc1080_BeeHDC1080'] = `hdc1080 = BeeHDC1080(bee.${port})`;

   var code = `hdc1080.read_humidity()`;
   return [code, Blockly.Python.ORDER_NONE];
};