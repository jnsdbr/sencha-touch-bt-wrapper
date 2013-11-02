/**
 * Sencha Bluetooth Wrapper for Cordova
 *
 * @version 0.8
 * @author Jens de Boer <jens@jnsdbr.de>
 */
Ext.define('ProjectName.util.Bluetooth', {

    // Only one instance
    singleton: true,

    // Config
    config: {
        socketId: -1,
        plugin: null,
        listeningName: 'ProjectName',
        listeningUUID: '00000000-1234-5678-9101-projectname13',
        devices: [],
        deviceModel: null,
        connectedDevice: null,
        bluetoothDataOffset: null,
        btMac: null,
        btUid: '00000000-0000-0000-0000-000000000000'
    },

    /**
     * Constructor
     *
     * @param config
     */
    constructor: function(config) {
        this.initConfig(config);

        // Load Cordova plugin
        this.setPlugin(cordova.require('cordova/plugin/bluetooth'));

        return this;
    },
    /**
     * Enables Bluetooth
     *
     * @param successCallback
     * @param errorCallback
     */
    enable: function(successCallback, errorCallback) {
    	var bluetoothPlugin = this.getPlugin();

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function() {
            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }

        if (bluetoothPlugin)
        {
    	    bluetoothPlugin.enable(onSuccess, onError);
        }
    },
    /**
     * Check if Bluetooth is enabled
     *
     * @param successCallback
     * @param errorCallback
     */
    isEnabled: function(successCallback, errorCallback) {
        var bluetoothPlugin = this.getPlugin();

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function(enabled) {
            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback(enabled);
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }

        // Call plugin
        bluetoothPlugin.isEnabled(onSuccess, onError);
    },
    /**
     * Check if there is a Bluetooth connection
     *
     * @return boolean
     */
    isConnected: function() {
        if(this.getSocketId() != -1)
        {
            return 1;
        }

        return 0;
    },
    /**
     * Disable Bluetooth
     *
     * @param successCallback
     * @param errorCallback
     */
    disable: function(successCallback, errorCallback) {
    	var bluetoothPlugin = this.getPlugin();

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function() {
            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }


        // Call plugin
        bluetoothPlugin.disable(onSuccess, onError);
    },
    /**
     * Connects to a Bluetooth device
     *
     * @param successCallback
     * @param errorCallback
     */
    connect: function(successCallback, errorCallback) {
    	var bluetoothPlugin = this.getPlugin();
    	var ref = this;

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

    	var onSuccess = function(socketId) {
    		ref.setSocketId(socketId);

            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
    	}

    	var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
    	}

        // Call plugin
    	bluetoothPlugin.connect(onSuccess, onError, this.getBtMac(), this.getBtUid());
    },
    /**
     * Disconnect from Bluetooth device
     *
     * @param successCallback
     * @param errorCallback
     */
    disconnect: function(successCallback, errorCallback) {
    	var bluetoothPlugin = this.getPlugin();
    	var ref = this;

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

    	var onSuccess = function() {
    		ref.setSocketId(-1);

            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
    	}

    	var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
    	}

        // Call plugin
    	bluetoothPlugin.disconnect(onSuccess, onError, this.getSocketId());
    },
    /**
     * Discovers Bluetooth devices
     *
     * @param successCallback
     * @param errorCallback
     */
    discover: function(successCallback, errorCallback) {
        var bluetoothPlugin = this.getPlugin();
        var ref = this;

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function(devices) {
            for(var i = 0; i < devices.length; i++)
            {
                // Simpel object
                var device = new Object();
                device.name = devices[i].name;
                device.mac = devices[i].address;

                ref.getDevices().push(device);
            }

            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }

        // Call plugin
        bluetoothPlugin.startDiscovery(onSuccess, onError);
    },
    /**
     * Cancels the discovery of Bluetooth devices
     *
     * @param successCallback
     * @param errorCallback
     */
    cancelDiscover: function(successCallback, errorCallback) {
        var bluetoothPlugin = this.getPlugin();

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function() {
            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }

        // Call plugin
        bluetoothPlugin.cancelDiscovery(onSuccess, onError);
    },
    /**
     * Fetches the UUIDs of a device
     *
     * @TODO finish up
     */
    fetchUID: function(successCallback, errorCallback) {
        var bluetoothPlugin = this.getPlugin();
        var ref = this;

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function(uuids) {
            for(var i = 0; i < uuids.length; i++)
            {

            }

            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback(uuids.length);
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }

        // Call plugin
        bluetoothPlugin.fetchUUIDs(onSuccess, onError, this.getBtMac());
    },
    /**
     * Reads data from the connected Bluetooth device
     *
     * @TODO Finish up
     *
     * @param successCallback
     * @param errorCallback
     *
     * @return data
     */
    read: function(successCallback, errorCallback) {
    	var bluetoothPlugin = this.getPlugin();
    	var data = null;

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

    	var onSuccess = function(p_data) {
    		data = p_data;

            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback(data);
    	}

    	var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);

            return null;
    	}

        // Call plugin
    	bluetoothPlugin.read(onSuccess, onError, this.getSocketId());

   		return data;
    },
    /**
     * Writes data to the connected Bluetooth device
     *
     * @param successCallback
     * @param errorCallback
     * @param data
     */
    write: function(successCallback, errorCallback, data) {
        var bluetoothPlugin = this.getPlugin();

        // Check if plugin is available
        if(bluetoothPlugin == null)
        {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback('Bluetooth Plugin not loaded!');
            return;
        }

        var onSuccess = function() {
            // Callback
            if(successCallback != undefined && typeof successCallback == 'function') successCallback();
        }

        var onError = function(error) {
            // Callback
            if(errorCallback != undefined && typeof errorCallback == 'function') errorCallback(error);
        }

        // Call plugin
        bluetoothPlugin.write(onSuccess, onError, this.getSocketId(), data);
    },
    /**
     * Formats the incoming data
     *
     * @TODO check if needed -> if not -> remove
     */
    formatBluetoothData: function(data) {
        if (!this.getBluetoothDataOffset())
        {
            this.setBluetoothDataOffset(new String(data));

            var start = this.getBluetoothDataOffset().search('{');
            var end = this.getBluetoothDataOffset().length;

            this.setBluetoothDataOffset(this.getBluetoothDataOffset().substr(start,end));

            return null;
        }
        else
        {
            var tmp = this.getBluetoothDataOffset() + data;
            this.setBluetoothDataOffset(new String(tmp));

            var substr = this.getBluetoothDataOffset().split('}');

            for(var i = 0; i < substr.length-1; i++){
                substr[i] += '}';
            }

            var data = substr[0];
            this.setBluetoothDataOffset(substr[1]);

            return data;
        }
    }
});