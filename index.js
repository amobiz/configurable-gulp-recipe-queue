'use strict';

var helper = require('gulp-ccr-stream-helper')('queue');

var schema = {
	title: 'queue',
	description: 'Pipe queued streams progressively.',
	type: 'object',
	properties: {
	}
};

function queue() {
	// lazy loading required modules.
	var StreamQueue = require('streamqueue');

	var gulp = this.gulp;
	var upstream = this.upstream;
	var tasks = this.tasks;

	var streams, streamQueue;

	helper.prerequisite(this, true, 1);

	if (tasks.length === 1) {
		return runTask(tasks[0]);
	}

	streams = tasks.map(runTask);
	streamQueue = new StreamQueue({
		objectMode: true
	});
	return streamQueue.done.apply(streamQueue, streams);

	function runTask(task) {
		var context;

		context = {
			gulp: gulp,
			config: {},
			upstream: upstream
		};
		return helper.runTask(context, task);
	}
}

module.exports = queue;
module.exports.schema = schema;
module.exports.type = 'stream';
