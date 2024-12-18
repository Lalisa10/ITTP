const Filter = require('./Filter')

class Sink extends Filter {
    /**
     *
     * @param {string} inPipe - tên input pipe
     * @param prefetchNumber
     */
    constructor(inPipe, prefetchNumber = 1) {
        super();
        this.pipes = [inPipe];
        this.inPipe = inPipe;
        this.numberOfTask = 0;
        this.prefetchNumber = prefetchNumber;
    }

    receive(message) {
        try {
            const ret = JSON.parse(message.content.toString());
            return ret;
        } catch (error) {
            console.error("Error occured when reading message from " + this.inPipe + ": ", error);
        }

    }

    async process(data) {

    }

    run() {
        this.channel.consume(this.inPipe, async (message) => {
            const inputData = this.receive(message);
            console.log("Received message from " + this.inPipe);
            try {
                const outputData = await this.process(inputData);
                this.numberOfTask++;
                console.log('Number of task completed: ', this.numberOfTask);
            } catch (error) {
                console.error('Error occurred at Sink', error.message);
            }

            if (this.channel && this.channel.connection && this.channel.connection.stream.readable) {
                this.channel.ack(message);
            } else {
                console.error('Channel is not open or already closed');
            }
        }, {noAck: false});
    }
}

module.exports = Sink;