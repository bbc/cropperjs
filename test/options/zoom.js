QUnit.test('options.zoom', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(3);

  return new Cropper(image, {
    built: function () {
      var cropper = this.cropper;

      cropper.zoom(0.1);

      done();
    },

    zoom: function (e) {
      assert.ok(e.detail.ratio > 0);
      assert.ok(e.detail.oldRatio > 0);
      assert.ok(e.detail.ratio > e.detail.oldRatio);
    }
  });
});

QUnit.test('options.zoom: default prevented', function (assert) {
  var done = assert.async();
  var util = window.Util;
  var image = util.createImage();

  assert.expect(1);

  return new Cropper(image, {
    built: function () {
      var cropper = this.cropper;
      var canvasData = cropper.getCanvasData();

      assert.deepEqual(cropper.zoom(0.1).getCanvasData(), canvasData);

      done();
    },

    zoom: function (e) {
      e.preventDefault();
    }
  });
});
