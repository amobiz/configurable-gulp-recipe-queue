'use strict';

var helper = require('gulp-ccr-stream-helper')('queue');

/**
 * Recipe:
 * 	Serial Join (from gulp.js cheatsheet p.2)
 *
 * Ingredients:
 * 	streamqueue
 *
 * Note:
 *  Some kind of stream version of gulp.series().
 *
 */
function queue() {
	// lazy loading required modules.
	var StreamQueue = require('streamqueue');

	var gulp = this.gulp;
	var config = this.config;
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
			config: config,
			upstream: upstream
		};
		return helper.runTask(context, task);
	}
}

queue.expose = [];

queue.schema = {
	title: 'queue',
	description: 'Pipe queued streams progressively.',
	properties: {
	}
};

queue.type = 'stream';

module.exports = queue;
