# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc
import warnings

import multi_pb2 as multi__pb2

GRPC_GENERATED_VERSION = '1.64.1'
GRPC_VERSION = grpc.__version__
EXPECTED_ERROR_RELEASE = '1.65.0'
SCHEDULED_RELEASE_DATE = 'June 25, 2024'
_version_not_supported = False

try:
    from grpc._utilities import first_version_is_lower
    _version_not_supported = first_version_is_lower(GRPC_VERSION, GRPC_GENERATED_VERSION)
except ImportError:
    _version_not_supported = True

if _version_not_supported:
    warnings.warn(
        f'The grpc package installed is at version {GRPC_VERSION},'
        + f' but the generated code in multi_pb2_grpc.py depends on'
        + f' grpcio>={GRPC_GENERATED_VERSION}.'
        + f' Please upgrade your grpc module to grpcio>={GRPC_GENERATED_VERSION}'
        + f' or downgrade your generated code using grpcio-tools<={GRPC_VERSION}.'
        + f' This warning will become an error in {EXPECTED_ERROR_RELEASE},'
        + f' scheduled for release on {SCHEDULED_RELEASE_DATE}.',
        RuntimeWarning
    )


class DownloadShortStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.DownTiktok = channel.unary_unary(
                '/downloadshort.DownloadShort/DownTiktok',
                request_serializer=multi__pb2.ParamsRequest.SerializeToString,
                response_deserializer=multi__pb2.ReturnsReply.FromString,
                _registered_method=True)
        self.DownYoutube = channel.unary_unary(
                '/downloadshort.DownloadShort/DownYoutube',
                request_serializer=multi__pb2.ParamsRequest.SerializeToString,
                response_deserializer=multi__pb2.ReturnsReply.FromString,
                _registered_method=True)
        self.InfoTiktok = channel.unary_unary(
                '/downloadshort.DownloadShort/InfoTiktok',
                request_serializer=multi__pb2.ParamsRequest.SerializeToString,
                response_deserializer=multi__pb2.ReturnsReply.FromString,
                _registered_method=True)
        self.DownTiktokAlt = channel.unary_unary(
                '/downloadshort.DownloadShort/DownTiktokAlt',
                request_serializer=multi__pb2.ParamsRequest.SerializeToString,
                response_deserializer=multi__pb2.ReturnsReply.FromString,
                _registered_method=True)


class DownloadShortServicer(object):
    """Missing associated documentation comment in .proto file."""

    def DownTiktok(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DownYoutube(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def InfoTiktok(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def DownTiktokAlt(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_DownloadShortServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'DownTiktok': grpc.unary_unary_rpc_method_handler(
                    servicer.DownTiktok,
                    request_deserializer=multi__pb2.ParamsRequest.FromString,
                    response_serializer=multi__pb2.ReturnsReply.SerializeToString,
            ),
            'DownYoutube': grpc.unary_unary_rpc_method_handler(
                    servicer.DownYoutube,
                    request_deserializer=multi__pb2.ParamsRequest.FromString,
                    response_serializer=multi__pb2.ReturnsReply.SerializeToString,
            ),
            'InfoTiktok': grpc.unary_unary_rpc_method_handler(
                    servicer.InfoTiktok,
                    request_deserializer=multi__pb2.ParamsRequest.FromString,
                    response_serializer=multi__pb2.ReturnsReply.SerializeToString,
            ),
            'DownTiktokAlt': grpc.unary_unary_rpc_method_handler(
                    servicer.DownTiktokAlt,
                    request_deserializer=multi__pb2.ParamsRequest.FromString,
                    response_serializer=multi__pb2.ReturnsReply.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'downloadshort.DownloadShort', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))
    server.add_registered_method_handlers('downloadshort.DownloadShort', rpc_method_handlers)


 # This class is part of an EXPERIMENTAL API.
class DownloadShort(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def DownTiktok(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/downloadshort.DownloadShort/DownTiktok',
            multi__pb2.ParamsRequest.SerializeToString,
            multi__pb2.ReturnsReply.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def DownYoutube(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/downloadshort.DownloadShort/DownYoutube',
            multi__pb2.ParamsRequest.SerializeToString,
            multi__pb2.ReturnsReply.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def InfoTiktok(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/downloadshort.DownloadShort/InfoTiktok',
            multi__pb2.ParamsRequest.SerializeToString,
            multi__pb2.ReturnsReply.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)

    @staticmethod
    def DownTiktokAlt(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(
            request,
            target,
            '/downloadshort.DownloadShort/DownTiktokAlt',
            multi__pb2.ParamsRequest.SerializeToString,
            multi__pb2.ReturnsReply.FromString,
            options,
            channel_credentials,
            insecure,
            call_credentials,
            compression,
            wait_for_ready,
            timeout,
            metadata,
            _registered_method=True)
