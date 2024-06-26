from micropython import const
from machine import I2C, Pin
from time import sleep


class BeeHDC1080:
    # device register values that can be written to (do not write to others)
    # used to specify location (pointer) to read from/write to
    TEMP_REG = const(0x00)  # temperature register
    HUMI_REG = const(0x01)  # humidity register
    CONF_REG = const(0x02)  # configuration register
    FSER_REG = const(0xFB)  # first two bytes of serial ID register
    MSER_REG = const(0xFC)  # middle two bytes of serial ID register
    LSER_REG = const(0xFD)  # last two bytes of serial ID register
    MFID_REG = const(0xFE)  # manufacturer ID register
    DVID_REG = const(0xFF)  # device ID register

    def __init__(self, port: tuple[int, int], slave_addr=64):
        self.i2c = I2C(scl=Pin(port[0]), sda=Pin(port[1]))
        self.addr = slave_addr
        # received data from temperature and humidity registers is two unsigned characters
        self.fmt = '>2B'
        # Sleep for 15 ms to allow the temperature and humidity temperatures to start recording
        # Only serial number registers 0xFB and 0xFF are available at first
        # set up for 14 bit resolution (in config register) for both temperature and humidity readings
        # independent measurements for now
        setup_data = 1 << 4
        data = bytearray(3)
        data[0] = CONF_REG
        data[1] = setup_data
        self.i2c.writeto(self.addr, data)

    def read_temperature(self, celsius=True):
        """ Read the temperature

        Keyword arguments:
        celsius -- If the data is kept as celsius after reading (default False)
        """
        # write to the pointer register, changing it to the temperature register
        data = bytearray([TEMP_REG])
        self.i2c.writeto(self.addr, data)
        # TODO: Waiting for a temperature update here may not be necessary, based on 14-bit resolution
        sleep(0.0635)
        data = self.i2c.readfrom(self.addr, 2)
        value = int.from_bytes(data, "big")
        # per the spec, the conversion to celsius is (value / (2 ** 16)) * 165 - 40
        if celsius:
            value = (value / (2 ** 16)) * 165 - 40
        else:
            value = (1.8 * value / (2 ** 16)) * 165 - 40
        return value

    def read_humidity(self):
        """ Read the relative humidity """
        # write to the pointer register, changing it to the humidity register
        data = bytearray([HUMI_REG])
        self.i2c.writeto(self.addr, data)
        # TODO: Waiting for a humidity update here may not be necessary, based on 14-bit resolution
        sleep(0.065)
        data = self.i2c.readfrom(self.addr, 2)
        value = int.from_bytes(data, "big")
        # conversion per the spec
        return (value / (2 ** 16)) * 100
